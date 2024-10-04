import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '@app/services/alert.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-alert', // Cambia 'alert' a 'app-alert'
  standalone: true,
  imports: [CommonModule], // Asegúrate de que CommonModule esté aquí
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  alert: any;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.onAlert()
      .subscribe(alert => {
        switch (alert?.type) {
          case 'success':
            alert.cssClass = 'alert alert-success';
            break;
          case 'error':
            alert.cssClass = 'alert alert-danger';
            break;
        }

        this.alert = alert;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}