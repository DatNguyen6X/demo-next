import {BehaviorSubject} from "rxjs";

export const userSubject = new BehaviorSubject(process.browser && (localStorage.getItem('user') ? JSON.parse(String(localStorage.getItem('user'))) : ''));