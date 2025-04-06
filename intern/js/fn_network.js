function calc_network_load(n, uptime) {
    var ret = 0;
    var maxima = {
        rx: 1200,
        tx: 10
    };
        for (var i=0; i<n.interface_count; i++) {
            ret += 100 - ((n.interface_data[i].rx_bytes / maxima.rx) * 100);
            ret += 100 - ((n.interface_data[i].tx_bytes / maxima.tx) * 100);
        }
		ret = ret / (n.interface_count * 2);
        console.log(ret);
		return(Math.ceil(ret));
}
