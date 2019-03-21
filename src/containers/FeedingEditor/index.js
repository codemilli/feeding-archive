import React, { Component } from 'react';
import { Container } from 'flux/utils';
import store from '../../store';
import actions from '../../actions';
import Form from './Form';
import css from './style.module.scss';

class FeedingEditor extends Component {
  static getStores() {
    return [store];
  }

  static calculateState() {
    const { feedings, ...state } = store.getState();
    const id = (/\d+$/g.exec(window.location.pathname) || [])[0];
    let target;
    if (id && feedings && feedings.length > 0) {
      target = feedings.find(a => a.id === id);
    }
    return { target, feedings, ...state };
  }

  componentDidMount() {
    if (this.state.feedings === undefined) {
      const { uid } = this.state.user;
      const { current } = this.props.match.params;
      setTimeout(() => actions.listenFeedings(uid, current));
    }
  }

  render() {
    const { target, processing: { feeding } } = this.state;
    const { current } = this.props.match.params;
    return (
      <section className={css.wrapper}>
        <div className={css['input-wrap']}>
          <Form
            date={current}
            feeding={target}
            loading={feeding}
            onCancel={this.onCancel}
            onSubmit={this.onSubmit}
          />
        </div>
      </section>
    );
  }

  onCancel = () => {
    this.props.history.goBack();
  };

  onSubmit = async (values) => {
    try {
      if (this.state.target) {
        const { user: { uid }, target: { id } } = this.state;
        await actions.updateFeeding(uid, id, values);
      } else {
        await actions.saveFeeding(this.state.user.uid, values);
      }
    }
    catch (e) {}
    finally {
      this.props.history.goBack();
    }
  };
}

export default Container.create(FeedingEditor);
