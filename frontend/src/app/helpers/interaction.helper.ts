import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
export enum StateToast { success, error };
@Injectable({
    providedIn: 'root'
})

// Helper utilisé pour toutes les interactions :
// - Loader
// - Toast
// - Modal
// - Alert
export class InteractionHelper {

    loader;
    constructor(
        private loadingController: LoadingController,
        private toastController: ToastController,
        private alertController: AlertController,
        private modalCtrl: ModalController) { }

    // Afficher message de chargement
    async showLoader() {
        this.loader = await this.loadingController.create({
            message: 'Chargement...',
            backdropDismiss: false,
            mode: 'ios'
        });
        await this.loader.present();
    }

    // Cacher message de chargement
    async hideLoader() {
        if (this.loader) {
            await this.loader.dismiss();
        } else {
            var element = document.getElementsByTagName("ion-loading"), index;
            for (index = element.length - 1; index >= 0; index--) {
                element[index].parentNode.removeChild(element[index]);
            }
        }
    }

    // Afficher notification
    async presentToast(stateToast: StateToast, message: string) {
        if (message) {
            let toastOption = {};
            switch (stateToast) {
                case StateToast.success:
                    toastOption['color'] = 'success';
                    toastOption['header'] = 'Succès';
                    toastOption['duration'] = 2000;
                    break;
                case StateToast.error:
                    toastOption['color'] = 'danger';
                    toastOption['header'] = 'Erreur';
                    toastOption['duration'] = 5000;
                    break;
                default:
                    break;
            }

            const toast = await this.toastController.create({ position: 'top', message: message, ...toastOption });
            toast.present();
        }
    }

    // Ouvrir modal
    async openModal(component, params = null) {
        const modal = await this.modalCtrl.create({
            component: component,
            backdropDismiss: true,
            componentProps: params,
            mode: 'ios',
            cssClass: 'modal'
        });
        await modal.present();
        return modal.onDidDismiss();
    }

    // Demander confirmation
    async confirmAlert(message, acceptcallback) {
        const alert = await this.alertController.create({
            mode: 'ios',
            header: 'Confirmation',
            message: message,
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                }, {
                    text: 'Continuer',
                    handler: acceptcallback
                }
            ]
        });
        await alert.present();
    }
}
