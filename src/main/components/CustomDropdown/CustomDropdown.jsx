import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';
// core components
import Button from '../CustomButtons/Button.jsx';

import customDropdownStyle from '../../../assets/jss/material-kit-pro-react/components/customDropdownStyle.jsx';

class CustomDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      clicks: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    const x = (this.state.clicks + 1) % 2;
    this.setState({ open: true, clicks: x });
  }
  handleClose() {
    this.setState({ open: false, clicks: 0 });
  }
  render() {
    const { open } = this.state;
    const {
      classes,
      buttonText,
      buttonIcon,
      dropdownList,
      buttonProps,
      dropup,
      dropdownHeader,
      caret,
      hoverColor,
      dropPlacement,
      rtlActive,
      noLiPadding,
      innerDropDown,
      navDropdown,
    } = this.props;
    const caretClasses = classNames({
      [classes.caret]: true,
      [classes.caretDropup]: dropup && !open,
      [classes.caretActive]: open && !dropup,
      [classes.caretRTL]: rtlActive,
    });
    const dropdownItem = classNames({
      [classes.dropdownItem]: true,
      [classes[hoverColor + 'Hover']]: true,
      [classes.noLiPadding]: noLiPadding,
      [classes.dropdownItemRTL]: rtlActive,
    });
    const dropDownMenu = (
      <MenuList className={classes.menuList} role="menu">
        {dropdownHeader !== undefined ? (
          <MenuItem
            className={classes.dropdownHeader}
            onClick={this.handleClose}
          >
            {dropdownHeader}
          </MenuItem>
        ) : null}
        {dropdownList.map((prop, key) => {
          if (prop.divider) {
            return (
              <Divider
                className={classes.dropdownDividerItem}
                key={key}
                onClick={this.handleClose}
              />
            );
          } else if (prop.ref === 'multi') {
            return (
              <MenuItem
                className={dropdownItem}
                key={key}
                style={{ overflow: 'visible', padding: 0 }}
              >
                {prop}
              </MenuItem>
            );
          }
          return (
            <MenuItem
              className={dropdownItem}
              key={key}
              onClick={this.handleClose}
            >
              {prop}
            </MenuItem>
          );
        })}
      </MenuList>
    );
    return (
      <div className={innerDropDown ? classes.innerManager : classes.manager}>
        <div className={buttonText !== undefined ? '' : classes.target}>
          <Button
            aria-haspopup="true"
            aria-label="Notifications"
            aria-owns={open ? 'menu-list' : null}
            buttonRef={node => {
              this.anchorEl = node;
            }}
            {...buttonProps}
            onClick={open ? this.handleClose : this.handleClick}
          >
            {buttonIcon !== undefined ? (
              <this.props.buttonIcon className={classes.buttonIcon} />
            ) : null}
            {buttonText !== undefined ? buttonText : null}
            {caret ? <b className={caretClasses} /> : null}
          </Button>
        </div>
        <Popper
          anchorEl={this.anchorEl}
          className={classNames({
            [classes.popperClose]: !open,
            [classes.pooperResponsive]: true,
            [classes.pooperNav]: open && navDropdown,
          })}
          disablePortal
          open={open}
          placement={dropPlacement}
          transition
        >
          {() => (
            <Grow
              id="menu-list"
              in={open}
              style={
                dropup
                  ? { transformOrigin: '0 100% 0' }
                  : { transformOrigin: '0 0 0' }
              }
            >
              <Paper className={classes.dropdown}>
                {innerDropDown ?
                  dropDownMenu
                  : (
                    <ClickAwayListener onClickAway={this.handleClose} ref="cacat">
                      {dropDownMenu}
                    </ClickAwayListener>
                  )}
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }

}

CustomDropdown.defaultProps = {
  caret: true,
  dropup: false,
  hoverColor: 'primary',
};

CustomDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  hoverColor: PropTypes.oneOf([
    'dark',
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
  ]),
  buttonText: PropTypes.node,
  buttonIcon: PropTypes.func,
  dropdownList: PropTypes.array,
  buttonProps: PropTypes.object,
  dropup: PropTypes.bool,
  dropdownHeader: PropTypes.node,
  rtlActive: PropTypes.bool,
  caret: PropTypes.bool,
  dropPlacement: PropTypes.oneOf([
    'bottom',
    'top',
    'right',
    'left',
    'bottom-start',
    'bottom-end',
    'top-start',
    'top-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
  ]),
  noLiPadding: PropTypes.bool,
  innerDropDown: PropTypes.bool,
  navDropdown: PropTypes.bool,
};

export default withStyles(customDropdownStyle)(CustomDropdown);
