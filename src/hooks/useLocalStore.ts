import * as React from 'react';

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
    const container = React.useRef<null | T>(null);
    if (container.current === null) {
        container.current = creator();
    }

    React.useEffect(() => {
        return () => container.current?.destroy();
    }, []);

    return container.current;
};

export interface ILocalStore {
    destroy(): void;
}