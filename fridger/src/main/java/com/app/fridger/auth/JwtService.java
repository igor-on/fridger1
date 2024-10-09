package com.app.fridger.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@Log4j2
public class JwtService {

    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437"; // TODO: make different secrets for ACCESS and REFRESH
    private final long ACCESS_TOKEN_EXP_TIME = 1000 * 60 * 60;
    private final long REFRESH_TOKEN_EXP_TIME = 48 * 60 * 60 * 1000;

    public TokenData generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        String token = createToken(claims, userName, ACCESS_TOKEN_EXP_TIME);
        return TokenData.builder()
                .token(token)
                .expirationDate(extractExpiration(token).toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())
                .build();
    }

    public String generateRefreshToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("refresh", true);
        return createToken(claims, userName, REFRESH_TOKEN_EXP_TIME);
    }

    public TokenData refreshAccessToken(String refreshToken) {
        String username = extractUsername(refreshToken);
        if (validateRefreshToken(refreshToken, username)) {
            return generateToken(username);
        }

        throw new RuntimeException("Invalid refresh token");
    }

    private String createToken(Map<String, Object> claims, String userName, long tokenExpTime) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + tokenExpTime))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }

    private Key getSignKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean extractRefresh(String token) {
        return extractClaim(token, (claims) -> {
            if (claims.containsKey("refresh")) {
                return claims.get("refresh", Boolean.class);
            } else return false;
        });
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        T apply = claimsResolver.apply(claims);
//        log.info("Extracted: " + apply.toString());
        return apply;
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // TODO: think about simplifying this
    public Boolean validateRefreshToken(String token, String udUsername) {
        final boolean isRefresh = extractRefresh(token);
        final String username = extractUsername(token);
//        log.info("validateRefreshToken: " +  (username.equals(udUsername) && !isTokenExpired(token) && isRefresh) );
        return (username.equals(udUsername) && !isTokenExpired(token)) && isRefresh;
    }

    public Boolean validateToken(String token, String udUsername) {
        final boolean isRefresh = extractRefresh(token);
        final String username = extractUsername(token);
//        log.info("validateToken: " +  (username.equals(udUsername) && !isTokenExpired(token) && !isRefresh) );
        return (username.equals(udUsername) && !isTokenExpired(token)) && !isRefresh;
    }
}
