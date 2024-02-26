import { SetStateAction, Dispatch,useEffect, useRef, useState } from "react";

// manage state and invoke a callback whenever state changes
export const useSyncState = <TState>(
  initialState: TState,
  syncCallback: (state: TState) => void
): [TState, Dispatch<SetStateAction<TState>>] => {
  const [syncState, setSyncState] = useState(initialState);

  const didMountRef = useRef(false);

  useEffect(() => {
    // check if component has mounted
    if (didMountRef.current) {
      syncCallback(syncState);
    }

    didMountRef.current = true;
  }, [syncState,syncCallback]);

  return [syncState, setSyncState];
};
