import { Component, Input, OnChanges } from '@angular/core';
import { VlilleStation } from '../../services/vlille/vlille';
import { FavoritesService } from '../../services/favorites/favorites';

@Component({
    selector: 'favorites-add-icon',
    templateUrl: './favorites-add-icon.html'
})

export class FavoritesAddIcon implements OnChanges {
    public isFavoriteStation: boolean = false;

    @Input() station: VlilleStation;

    constructor(private favoritesService: FavoritesService) {}

    ngOnChanges() {
        this.isFavoriteStation = this.favoritesService.contains(this.station);
    }

    /**
     * Updates favorites service and star icon
     */
    public toggleFavorite() {
        this.isFavoriteStation = !this.isFavoriteStation;

        if (this.isFavoriteStation) {
            this.isFavoriteStation = this.favoritesService.add(this.station);
        } else {
            this.isFavoriteStation = !this.favoritesService.remove(this.station);
        }
    }}