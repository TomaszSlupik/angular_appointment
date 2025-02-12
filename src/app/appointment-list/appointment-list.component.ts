import { Component } from '@angular/core';
import {Appointment} from '../models/appointment'
import { OnInit } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

    newAppointmentTitle: string = "";
    newAppointmentDate: string = "";
    appointments: Appointment[] = [];

    editAppointmentTitle: string = "";
    editAppointmentDate: string = "";
    editAppointmentIndex: number = -1;

    ngOnInit(): void {
      const storedAppointments = localStorage.getItem("appointments");
      if (storedAppointments) {
        this.appointments = JSON.parse(storedAppointments); 
        console.log('Dane pobrane z LocalStorage');
      }

      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      this.newAppointmentDate = formattedDate;
    }
    

    addAppointment () {
      if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
        const newAppintment: Appointment = {
          id: Date.now(),
          title: this.newAppointmentTitle,
          date: this.newAppointmentDate
        }
        this.appointments.push(newAppintment)

        this.newAppointmentTitle = ""
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        this.newAppointmentDate = formattedDate

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

    // okno edycji
    editOpenWindow (appointment: Appointment, index: number) {
      this.editAppointmentTitle = appointment.title
      this.editAppointmentDate = appointment.date
      this.editAppointmentIndex = index

      const modalElement = document.getElementById('editModal')!;
      const modal = new Modal(modalElement);
      modal.show();
    }
    
    saveEditToLocalStorage () {
      if (this.editAppointmentTitle.trim().length && this.editAppointmentDate) {
        const editAppointment: Appointment = {
          id: this.appointments[this.editAppointmentIndex].id, 
          title: this.editAppointmentTitle,
          date: this.editAppointmentDate
        }

        this.appointments[this.editAppointmentIndex] = editAppointment;
        localStorage.setItem("appointments", JSON.stringify(this.appointments))

        const modalElement = document.getElementById('editModal')!;
        const modal = new Modal(modalElement);
        modal.hide();
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'visible'
      }
      else {
        alert("Pola nie mogą być puste")
      }
    }

}
