// eslint-disable-next-line import/prefer-default-export
export class Priority {
  // eslint-disable-next-line class-methods-use-this
  renderPriority(priority) {
    if (priority === 'high') {
      return '<i class="fa-solid fa-arrow-up high-priority priority"></i>';
    }
    if (priority === 'medium') {
      return '<i class="fa-solid fa-equals medium-priority priority"></i>';
    }
    if (priority === 'low') {
      return '<i class="fa-solid fa-arrow-down low-priority priority"></i>';
    }
    return 'unknown';
  }
}
