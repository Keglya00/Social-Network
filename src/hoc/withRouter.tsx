import React from 'react';
import { useParams } from 'react-router-dom';

type WithRouterPropsType = {
  params: Record<string, string>
}

function withRouter<T>(WrappedComponent: React.ComponentType<T>){ 
  return (props: Omit<T, keyof WithRouterPropsType>) => {
    const params = useParams();
    return(
      <WrappedComponent {...props as T} params={params} />
    )
  }
}


export default withRouter;