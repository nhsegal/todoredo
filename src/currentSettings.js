const currentSettings = {
  viewBy: 'all',
  whichProject: null,

  update(newView, whichP = null) {
    this.viewBy = newView;
    this.whichProject = whichP;
  },
};

export default currentSettings;
