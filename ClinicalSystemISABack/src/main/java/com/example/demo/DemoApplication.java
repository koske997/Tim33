package com.example.demo;

import com.example.demo.model.Mail;
import com.example.demo.service.MailService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class DemoApplication {

	private static ApplicationContext ctx;

	public static void main(String[] args) {

		//Mail mail = new Mail();
		//mail.setMailFrom("koske.koske035@gmail.com");
		//mail.setMailTo("jovan.jenjic@gmail.com");
		//mail.setMailSubject("Spring Boot-Mail Example- JOVO RADI MEJL");
		//mail.setMailContent("Learn How to send Email using Spring Boot!!! Thanks nwww.technicalkeeda.com");
		ctx =  SpringApplication.run(DemoApplication.class, args);

		//MailService mailService = (MailService) ctx.getBean("mailService");
		//mailService.sendMail(mail);
	}

	public static MailService getCtx(){
		return (MailService) ctx.getBean("mailService");
	}

}