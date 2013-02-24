package br.com.apprix.worldwideweather.activity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.webkit.WebView;
import br.com.apprix.worldwideweather.R;

public class WeatherMapActivity extends Activity {

	@Override
	@SuppressLint("SetJavaScriptEnabled")
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weather_map);
        
        String url = getResources().getString(R.string.webapp_url);
        
        WebView webview = (WebView) findViewById(R.id.webview);
        webview.getSettings().setJavaScriptEnabled(true);
		webview.loadUrl(url);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_weather_map, menu);
        return true;
    }
    
}