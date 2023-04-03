package com.omm.util;

import org.springframework.util.Base64Utils;

import java.io.BufferedInputStream;
import java.sql.Blob;
import java.util.Base64;

public class ImageUtil {
    /**
     * base64 URL -> byte []
     * @param base64Url
     * @return
     */
    public byte[] urlToByte(String base64Url) {
        byte imageArray [] = null;
        final String BASE_64_PREFIX = "data:image/png;base64,";
        try {
            if (base64Url.startsWith(BASE_64_PREFIX)){
                imageArray =  Base64.getDecoder().decode(base64Url.substring(BASE_64_PREFIX.length()));
                return imageArray;
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    /**
     * blob -> URL(String)
     * @param blob
     * @return
     */
    public String blobToURL(Blob blob) {
        byte[] arr = blobToBytes(blob);
        if(arr.length > 0 && arr != null){
            String base64Encode = byteToBase64(arr);
            base64Encode = "data:image/png;base64," + base64Encode;
            return base64Encode;
        }
        return "";
    }

    /**
     * blob -> byte[]
     * @param blob
     * @return
     */
    public static byte[] blobToBytes(Blob blob) {
        BufferedInputStream is = null;
        byte[] bytes = null;
        try {
            is = new BufferedInputStream(blob.getBinaryStream());
            bytes = new byte[(int) blob.length()];
            int len = bytes.length;
            int offset = 0;
            int read = 0;

            while (offset < len
                    && (read = is.read(bytes, offset, len - offset)) >= 0) {
                offset += read;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return bytes;
    }

    /**
     * byte[] -> base64
     * @param arr
     * @return
     */
    public static String byteToBase64(byte[] arr) {
        String result = "";
        try {
            result = Base64Utils.encodeToString(arr);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
