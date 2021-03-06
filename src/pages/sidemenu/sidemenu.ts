import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform, ModalController } from 'ionic-angular';
import { About } from '../about/about';
import { Contribs } from '../contribs/contribs';
import { Feedback } from '../feedback/feedback';

import { AppSettings } from '../../app/app.settings';
import * as Raven from 'raven-js';

@Component({
    selector: 'sidemenu',
    templateUrl: 'sidemenu.html'
})

export class Sidemenu {

    public appVersion: string;

    constructor(
        appVersionPlugin: AppVersion,
        private platform: Platform,
        private inAppBrowserPlugin: InAppBrowser,
        private socialSharingPlugin: SocialSharing,
        private modalCtrl: ModalController
    ) {
        this.platform
            .ready()
            .then(() => appVersionPlugin.getVersionNumber())
            .then(version => this.appVersion = version);
    }

    /**
     * Open the app store page
     */
    public rateApp() {
        if (this.platform.is('android')) {
            this.inAppBrowserPlugin.create('market://details?id=' + AppSettings.appId.android, '_system');
        } else if (this.platform.is('ios')) {
            this.inAppBrowserPlugin.create('itms-apps://itunes.apple.com/fr/app/vliller/id' + AppSettings.appId.ios + '?mt=8', '_system');
        } else {
            Raven.captureException(new Error('Rate app - Unknow platform?!'));
        }
    };

    /**
     *
     * @param {String} link
     */
    public openLink(link) {
        this.inAppBrowserPlugin.create(link, '_system');
    };

    /**
     * Show bug report form
     */
    public openBugReport() {
        this.modalCtrl.create(Feedback, {
            appVersion: this.appVersion
        }).present();
    };

    /**
     * Show system social sharing to share the Vliller landing page.
     */
    public openSocialSharing() {
        this.socialSharingPlugin.shareWithOptions({
            url: AppSettings.vlillerSiteUrl
        });
    };

    /**
     * Show about Vliller page.
     */
    public openAboutPage() {
        this.modalCtrl.create(About, {
            appVersion: this.appVersion
        }).present();
    }

    /**
     * Show contributors page.
     */
    public openContribsPage() {
        this.modalCtrl.create(Contribs).present();
    }
}