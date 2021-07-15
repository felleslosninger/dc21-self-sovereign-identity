package com.digdir.issuer.security;


import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * Method that sets path "/protectedpage" as a protected resource. The resource needs authentication through ID-porten.
     * @param http HttpSecurity
     * @throws Exception Exception unknown when thrown
     */
    @Override
    public void configure(HttpSecurity http) throws Exception {


        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/protectedpage").fullyAuthenticated()
                .anyRequest().permitAll()
                .and()
                .oauth2Login();
    }
    

}
