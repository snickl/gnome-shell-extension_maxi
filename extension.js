import Meta from 'gi://Meta';
import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class MaxiExtension extends Extension {
    enable() {
	this._settings = this.getSettings();
        this._windowCreatedId = global.display.connect('window-created', (d, win) => {
            win._maxievtId = win.connect('focus', (win) => {

                const DEBUG = this._settings.get_boolean('debug');

                if (DEBUG) {
                    global.log(" \
                    gnome-extension maxi@snickl.github.com: gtk_application_id: "
                        + win.gtk_application_id
                    );
                }

                if (!this._settings.get_strv('blacklisted-apps').includes(win.gtk_application_id + ".desktop")) {
                    if (win.can_maximize()) {
                        if (this._settings.get_boolean('vertical')) {
                            win.maximize(Meta.MaximizeFlags.VERTICAL);
                        }
                        if (this._settings.get_boolean('horizontal')) {
                            win.maximize(Meta.MaximizeFlags.HORIZONTAL);
                        }
                    }
                } else {
                    if (DEBUG) {
                        global.log('gnome-extension maxi@snickl.github.com: "' + win.gtk_application_id + '" is blacklisted');
                    }
                }
                win.disconnect(win._maxievtId);
            });
        });
    }

    disable() {
        global.display.disconnect(this._windowCreatedId);
        this._windowCreatedId = null;
	this._settings = null;
    }
}
