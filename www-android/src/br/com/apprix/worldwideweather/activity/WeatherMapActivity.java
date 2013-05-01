package br.com.apprix.worldwideweather.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.webkit.WebSettings;
import android.webkit.WebView;
import br.com.apprix.worldwideweather.R;

public class WeatherMapActivity extends Activity {

	private WebView webview = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_weather_map);

		initWebView();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.activity_weather_map, menu);
		return true;
	}

	private void initWebView() {
		if (webview != null) return;

		webview = (WebView) findViewById(R.id.webview);
		
		WebSettings settings = webview.getSettings();
		settings.setJavaScriptEnabled(true);
		settings.setGeolocationEnabled(true);
		
		String url = getResources().getString(R.string.webapp_url);
		webview.loadUrl(url);
	}

}