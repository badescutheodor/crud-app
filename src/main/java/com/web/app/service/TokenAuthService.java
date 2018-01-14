package com.web.app.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

import static java.util.Collections.emptyList;

public class TokenAuthService {
    private static final long kExpiration = 86400000;//1d
    private static final String kSecret = "askdjwo";
    private static final String kPrefix = "TOKEN";
    private static final String kHeader = "Authorization";

    private static TokenAuthService instance;

    public static TokenAuthService getInstance() {
        if (instance == null)
            instance = new TokenAuthService();
        return instance;
    }

    public void addAuthentication(HttpServletResponse response, String username) {
        String jwt = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + kExpiration))
                .signWith(SignatureAlgorithm.HS512, kSecret)
                .compact();
        response.addHeader(kHeader, kPrefix + " " + jwt);
    }

    public Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(kHeader);
        if (token != null) {
            String user = Jwts.parser()
                    .setSigningKey(kSecret)
                    .parseClaimsJws(token.replace(kPrefix, ""))
                    .getBody()
                    .getSubject();
            return user != null ?
                    new UsernamePasswordAuthenticationToken(user, null, emptyList()) : null;
        }
        return null;
    }
}
