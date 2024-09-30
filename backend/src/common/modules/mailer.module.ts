import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports:[
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com', // Your SMTP server
                port: 587, // Your SMTP port
                auth: {
                    user: 'testing.services.for.mail@gmail.com',
                    pass: 'uulbzstaxaosncwr',
                },
            },
            defaults: {
                from: '"No Reply" <no-reply@example.com>', // Default sender
            },
            template: {
                dir: process.cwd() + '/src/common/templates', // Directory for templates
                adapter: new HandlebarsAdapter() , // Template engine
                options: {
                    strict: true,
                },
            },
        }),
    ]
})

export class mailermodule {
}   