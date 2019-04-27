package com.largelistdemo;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactApplication;
import android.view.KeyEvent;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "LargeListDemo";
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        ReactContext context = getReactInstanceManager().getCurrentReactContext();
        if (BuildConfig.DEBUG && keyCode == 4) {
            ReactNativeHost rnh = ((ReactApplication) getApplication()).getReactNativeHost();
            rnh.getReactInstanceManager().showDevOptionsDialog();
            return false;
        }
        return super.onKeyDown(keyCode, event);
    }
}
