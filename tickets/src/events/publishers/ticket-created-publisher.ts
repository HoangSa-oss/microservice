import {Publisher,Subjects,TicketCreatedEvent} from '@saigon/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}
