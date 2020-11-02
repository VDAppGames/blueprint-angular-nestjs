import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { InteractionHelper, StateToast } from './interaction.helper';

@Injectable({
    providedIn: 'root'
})
export class ObservableHelper {

    constructor(private interactionHelper: InteractionHelper) { }

    // Enrichir les Observable avec :
    // - Un message en cas de succès
    // - Un message en cas d'erreur
    // - Un message lors du chargement
    // - Une action de rappel personnalisée (uniquement en cas de succès)
    observableCustom(observable: Observable<any>, messageSuccess, messageError, callback = (res) => {}) {
        this.interactionHelper.showLoader();
        return observable.pipe(
            tap(res => { this.interactionHelper.presentToast(StateToast.success, messageSuccess); callback(res)}),
            catchError(err => this.interactionHelper.presentToast(StateToast.error, messageError)),
            finalize(() => this.interactionHelper.hideLoader())
        )
    }
}
