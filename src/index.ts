// Define global Webflow type if needed

import { updateDateElements } from '$utils/utils';

window.Webflow ||= [];
window.Webflow.push(() => {
  updateDateElements();
});
