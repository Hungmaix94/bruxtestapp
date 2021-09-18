/* eslint no-console: off */
//@ts-nocheck
export default () => next => action => {
  if (process.env.NODE_ENV !== 'production') {
    const { type, payload, meta, error } = action;

    console.groupCollapsed(type);
    console.log('Payload:', payload);
    if (error) {
      console.log('Error:', error);
    }
    console.log('Meta:', meta);
    console.groupEnd();
  }

  return next(action);
};
