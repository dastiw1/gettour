import { showError} from '../utils';
export default {
  availableAlignments: ['right-bottom', 'left-bottom', 'middle-center'],
  changeWidgetAlignment(alignment) {
    if (!this.block) {
      return;
    }
    let classPrefix = this.rootClass;
    let uuid = this.active.condition;

    this.availableAlignments.forEach(item => {
      let className = `${classPrefix}--${item}`;

      this.block.classList.remove(className);
    });
    this.block.classList.add(`${classPrefix}--${alignment}`);
    // save conditions as options
    this.__setConditionAlignment(uuid, alignment);
    if (this.options.alignment !== alignment) {
      this.options.alignment = alignment;
    }
  },
  __setConditionAlignment(uuid, alignment) {
    if (this.autoShowConditions[uuid]) {
      this.autoShowConditions[uuid].options.alignment = alignment;
    } else {
      showError(`Can't set condition alignment. Condition with UUID ${uuid} is not found`);
    }
  },
  loadingStateToggle(val = null) {
    if (!this.block) {
      return;
    }
    let tglClass = 'getchat-widget--loading';
    let newValue =
      val === null ? !this.block.classList.contains(tglClass) : val;

    if (newValue) {
      this.block.classList.add(tglClass);
    } else {
      this.block.classList.remove(tglClass);
    }
  },
  previewModeToggle(value = null) {
    if (!this.block) {
      return;
    }
    let preview = value === null ? !this.options.preview : value;

    if (preview) {
      this.block.classList.add(`${this.rootClass}--preview`);
    }
  }
};
