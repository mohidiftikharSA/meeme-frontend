// import {useEffect, useMemo} from 'react';
// import { useActionCable } from '@aersoftware/react-use-action-cable';

// export const useActionCableHook = (url) => {
//     const actionCable = useActionCable(url);

//     useEffect(() => {
//         // ActionCable.startDebugging();
//         return () => {
//             console.log('Disconnect Action Cable');
//             actionCable.disconnect();
//         };
//     }, []);
//     return {actionCable};
// };