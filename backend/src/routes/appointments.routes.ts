import { request, response, Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";


import AppointmentRepository from '../repositories/AppointmentRepository';
import  CreateAppointmentService from '../services/CreateAppointmentService';
import Appointment from "../models/Appointment";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";


const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated)

appointmentRouter.get('/', async (request, response)=>{

  const appointmentsRepository = getCustomRepository(AppointmentRepository)
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentRouter.post('/', async (request,response)=>{
  try{
    const {provider , date} = request.body;

    const parsedDate = parseISO(date);

    const CreateAppointment = new CreateAppointmentService();

    const appointment =  await CreateAppointment.execute({
      date:parsedDate,
      provider,
    });

    return response.json(appointment);

  }catch(err){
    return response.status(400).json({error: err.message});
  }
});

export default appointmentRouter;



