package com.t4health.signs.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

//@Service
public class DiagnosisChecker {
  /*  @Value("${RAPIDAPI_KEY}")
    private String rapidApiKey;
    @Value("${RAPIDAPI_HOST}")
    private String rapidApiHost;
    @Value("${RAPIDAPI_URL}")
    private String rapidApiUrl;*/

    public String checker() {
        System.out.println("Response API KEY: Rugute ");

       /* try {
            String jsonInputString = """
                    {
                      "symptoms": [
                        "fever",
                        "cough",
                        "fatigue"
                      ],
                      "age": 35,
                      "sex": "male"
                    }
                    """;
            String apiUrl = rapidApiUrl;
            URL url = new URL(apiUrl);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");


            con.setRequestProperty("X-RapidAPI-Key", rapidApiKey);
            con.setRequestProperty("X-RapidAPI-Host", rapidApiHost);
            con.setRequestProperty("Content-Type", "application/json");

            con.setDoOutput(true);
            try (OutputStream os = con.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int responseCode = con.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            // Read the response
            try (BufferedReader br = new BufferedReader(new InputStreamReader(
                    con.getInputStream(), "utf-8"))) {

                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                System.out.println("Response Body:");
                System.out.println(response.toString());
                return response.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return e.toString();
        }*/
        //}
        return "";
    }
}

