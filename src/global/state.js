import createRhinoState from 'react-rhino';

const { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState } = createRhinoState({
  user: null,
});

export { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState };
