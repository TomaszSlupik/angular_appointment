import { Component } from '@angular/core';
import {Appointment} from '../models/appointment'
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

    newAppointmentTitle: string = "";
    newAppointmentDate: Date = new Date();
    appointments: Appointment[] = [];

    ngOnInit(): void {
      const storedAppointments = localStorage.getItem("appointments");
      if (storedAppointments) {
        this.appointments = JSON.parse(storedAppointments); 
        console.log('Dane pobrane z LocalStorage');
      }
    }
    

    addAppointment () {
      if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
        const newAppintment: Appointment = {
          id: Date.now(),
          title: this.newAppointmentTitle,
          date: new Date(this.newAppointmentDate)
        }
        this.appointments.push(newAppintment)

        this.newAppointmentTitle = ""
        this.newAppointmentDate = new Date()

        localStorage.setItem("appointments", JSON.stringify(this.appointments))
      }
      else {
        alert('Musisz wprowadzić nazwę spotkania i datę')
      }

    }

    deleteAppointment (index: number) {
      this.appointments.splice(index, 1)
      localStorage.setItem("appointments", JSON.stringify(this.appointments))
    }

}
