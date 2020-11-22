
export const state = { asideMenuCollapse: false };

export function setAsideMenuCollapse(payload) {
  state.asideMenuCollapse = payload;
}

export default { state, setAsideMenuCollapse };
