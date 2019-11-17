// import React, {useEffect, useState} from 'react'
// import { store$ } from '../../reducers/index'
//
// // const Cover = (Component) => {
// //     const WithStateComponent = () => {
// //         const [state, setState] = useState(null);
// //         useEffect(() => {console.log('useeffect')
// //             const subscription = store$.subscribe(store => {
// //
// //                 setState(store)
// //             })
// //             return () => subscription.unsubscribe()
// //         }, )
// // console.log(state)
// //         return <Component {...state} />;
// //     }
// //     return WithStateComponent;
// // }
//
// const Cover = Component => {
//     return class extends React.Component {
//         componentDidMount() {
//             this.subscription = store$.subscribe(newState =>
//                 this.setState({ ...newState }),
//             );
//         }
//
//         componentWillUnmount() {
//             this.subscription.unsubscribe();
//         }
//         render() {
//
//             console.log(this.state)
//             return (
//                 () => <Component {...this.state} />
//             );
//         }
//     };
// };
// export default Cover
//
//
//
