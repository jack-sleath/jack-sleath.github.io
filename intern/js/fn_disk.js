function calc_disk_load(n) {
    var ret = 0;
    var maxima = {
        writeiops: 50,
        readiops: 9000,
		disk_usage: 50
    };

        for (var i=0; i<n.drive_count; i++) {
            ret += 100 - ((n.drive_data[i].write_iops / maxima.writeiops) * 100);
            ret += 100 - ((n.drive_data[i].read_iops / maxima.readiops) * 100);
			var a = (n.drive_data[i].disk_capacity - n.drive_data[i].free_capacity);
			var b = (a / n.drive_data[i].disk_capacity);
            ret += (((b * 100) / maxima.disk_usage)*100);
        }
		ret = ret / (n.drive_count * 3);
        console.log(ret);
        return(Math.ceil(ret));
}
