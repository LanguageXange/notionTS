import { Page } from "../utils/types";
import { useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase-client";
import startPageScaffold from "../scaffold.json";
import { Loader } from "../components/Loader";
import { createPage } from "../utils/misc";
import { nanoid } from "nanoid";

type InjectedProps = {
  initialState: Page;
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

// essentially we no longer need to pass in initialState props in AppStateProvider
export function withState<TProps>(
  WrappedComponent: React.ComponentType<
    PropsWithoutInjected<TProps> & InjectedProps
  >
) {
  return (props: PropsWithoutInjected<TProps>) => {
    const match = useMatch("/:slug");
    const pageSlug = match ? match.params.slug : "start";

    const [initialState, setInitialState] = useState<Page | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
      setIsLoading(true);
      const fetchInitialState = async () => {
        try {
          const { data: userData } = await supabase.auth.getUser();
          const user = userData.user;
          if (!user) {
            throw new Error("User is not logged in");
          }
          const { data } = await supabase
            .from("pages")
            .select("title, id, cover, nodes, slug")
            .match({ slug: pageSlug, created_by: user.id })
            .single();
      
          // console.log(data, "supabase data");
          // console.log(pageSlug, "page slug");

          // need to disable row level security policy and create own policy
          if(data){
            const parsedData = {...data, nodes: JSON.parse(data.nodes)}
            setInitialState(parsedData);
          }
          if (!data && pageSlug === "start") {
            const result = await supabase
              .from("pages")
              .insert({
                ...startPageScaffold,
                slug: "start",
                created_by: user.id,
                id: nanoid(),
              })
              .single();

            console.log(result, "what is result");
            setInitialState(result?.data);
          } 
        } catch (e) {
          if (e instanceof Error) {
            setError(e);
          }
        }
        setIsLoading(false);
      };
      fetchInitialState();
    }, [pageSlug]);

    if (isLoading) {
      return (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      );
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    if (!initialState) {
      // temporary workaround while I debugging supabase
      setInitialState(createPage());
      return <div className="">Cannot find this page</div>;
    }

    return <WrappedComponent {...props} initialState={initialState} />;
  };
}
