package org.example.backend.config;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class SameSiteCookieConfiguration implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletResponse res = (HttpServletResponse) response;
        HttpServletResponseWrapper responseWrapper = new HttpServletResponseWrapper(res) {
            @Override
            public void addHeader(String name, String value) {
                if ("Set-Cookie".equalsIgnoreCase(name)) {
                    // Forzamos SameSite=None y eliminamos Secure en local
                    value = value + "; SameSite=None";
                    value = value.replace("; Secure", ""); // Elimina el atributo Secure si está presente
                }
                super.addHeader(name, value);
            }
        };

        chain.doFilter(request, responseWrapper);
    }
}

