function calc_CPU_load(n) {
    var ret = 0;
    var maxima = {
        coreload: 32
    };
        for (var i=0; i<n.core_count; i++) {
            ret += 100 - ((n.core_load_instant[i] / maxima.coreload) * 100);
            ret += 100 - ((n.core_load_5m[i] / maxima.coreload) * 100);
            ret += 100 - ((n.core_load_15m[i] / maxima.coreload) * 100);
        }
		ret = ret / (n.core_count * 3);
        console.log(ret);
        return(Math.ceil(ret));
}
