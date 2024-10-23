package com.app.fridger.utils;

import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Log4j2
public class Utils {

    public static byte[] compressMultipartImage(MultipartFile multipartImage) throws IOException {
        log.debug("Size before compression: " + multipartImage.getSize());

        BufferedImage bi = ImageIO.read(multipartImage.getInputStream());
        bi = Thumbnails.of(bi)
                .size(bi.getWidth(), bi.getHeight())
                .outputQuality(0.1)
                .keepAspectRatio(true)
                .asBufferedImage();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        String format = multipartImage.getContentType() != null ? multipartImage.getContentType().split("/")[1] : "jpg";
        ImageIO.write(bi, format, baos);

        log.debug("Size after compression: " + baos.size());

        return baos.toByteArray().length > multipartImage.getSize() ? multipartImage.getBytes() : baos.toByteArray();
    }
}
