package com.bluezone;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import com.scan.AppUtils;
import com.scan.ServiceTraceCovid;

/**
 * Class chạy khi start lại
 *
 * @author khanhxu
 */
public class BootStartReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        try {
            // Log
            AppUtils.writeLog(context, "BootStartReceiver onReceive");

            // Start services
            Intent intentStart = new Intent(context, ServiceTraceCovid.class);
            // Start service
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intentStart);
            } else {
                context.startService(intentStart);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
