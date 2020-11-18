
$(document).ready(function() {
    var $size = $("#size");
    var $speed = $("#speed");
    var $data_set = $("#data_set");
    var $merge_array = $("#merge_array");
    var $alert_holder = $("#alert_holder");

    var $start = $("#start");
    var $stop = $("#stop");
    var $previous = $("#previous");
    var $next = $("#next");

    var $time = $("#time");

    var interval;
    var count = 0;
    var sort_array = [];
    //to store the original array so that can be restored back.
    var original = [];
    var history = [];
    
    var grid_width = 800/$size.val();

    renderPage(sort_array,$data_set,$size,$time,$merge_array,grid_width);
    $size.on('change',function(){
        count = 0;
        sort_array = [] ;
        grid_width = 800/$size.val();
        original= [];

        clearInterval(interval);
        renderPage(sort_array,$data_set,$size, $time,$merge_array,grid_width);        
    });

    $speed.on('change',function(){
        count = 0;
        sort_array = [] ;
        grid_width = 800/$size.val();
        original=[];

        clearInterval(interval);
        renderPage(sort_array,$data_set,$size, $time,$merge_array,grid_width);        
    });

    $start.on('click', function(){
        clearInterval(interval);
        var sleep_time = 1000/$speed.val();
        if (count >= sort_array.length){
            return;
        };
        
        interval = setInterval(function(){
            var data = sort_array[count];
            if(data[0] === "create"){
                create_subarray($merge_array,$data_set,data,grid_width,history);
            }else{
                replace_original($merge_array,$data_set,data,grid_width,original);
            }
            
            count ++;
            if (count >= sort_array.length){
                clearInterval(interval);
                return;
            };

        },sleep_time);
        
    });

    $stop.on('click', function(){
        clearInterval(interval);
    });

    $previous.on('click',function(){
        if(count >= sort_array.length){
            count--;
        }
        if (count > 0 ){
            count --;
            var data = sort_array[count];
            data = sort_array[count];
            if(data[0] === "create"){
                restore_subarray($merge_array,data,grid_width,history);
            }else{
                restore_orginal($data_set,data,grid_width,original);
            }
        }else{
            var alert = "<div class='alert alert-danger alert-dismissible'>"+
            "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
            "<strong>Failed!</strong>This is the first round</div>";
            $alert_holder.html(alert);
            return;
        }
    })

    $next.on('click',function(){
        if (count >= sort_array.length){
            var alert = "<div class='alert alert-danger alert-dismissible'>"+
            "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
            "<strong>Failed!</strong>This is the last round</div>";
            $alert_holder.html(alert);
            return;
        }else{
            var data = sort_array[count];
            if(data[0] === "create"){
                create_subarray($merge_array,$data_set,data,grid_width,history);
            }else{
                replace_original($merge_array,$data_set,data,grid_width,original);
            }
            count ++;
        }
    })
});


//render page
function renderPage(sort_array,$data_set,$size,$time,$merge_array,grid_width){
    
    random_numbers = getRandomIntegerArray(10,500,$size.val());

    $data_set.html("");
    $merge_array.html("");

    var grid_border = grid_width+1;
    random_numbers.forEach(function(value){
        style="'border-left: "+grid_width+"px solid black;width:"+grid_border+"px;height:"+value+ "px;'";
        $data_set.append("<div style="+style+"></div>");
        $merge_array.append("<div style='height:0px;width:"+grid_border+"px;'"+"></div>");
    })
    var start_time = new Date();
    mergeSort(random_numbers,sort_array,0,random_numbers.length-1);
    var end_time = new Date();
    var diff_time = end_time.getTime() - start_time.getTime();
    $time.html("Sorting time: "+diff_time + "ms");
}

function create_subarray($merge_array,$data_set,data,grid_width,history){
    var temp_index = data[1];
    var original_index = data[2];
    $temp_grid = $merge_array.children().eq(temp_index);
    $original_grid = $data_set.children().eq(original_index);
    history.push($temp_grid.css("height"));
    $temp_grid.css("height",$original_grid.css("height"));
    $temp_grid.css("border-left",grid_width+"px solid green");
}

function restore_subarray($merge_array,data,grid_width,history){
    var temp_index = data[1];
    $temp_grid = $merge_array.children().eq(temp_index);
    $temp_grid.css("height",history.pop());
    $temp_grid.css("border-left",grid_width+"px solid green");

}

function replace_original($merge_array,$data_set,data,grid_width,original){
    var start_index = data[1];
    var end_index = data[2];
    for (var i = start_index ; i <= end_index;i++){
        $temp_grid = $merge_array.children().eq(i);
        $original_grid = $data_set.children().eq(i);
        original.push($original_grid.css("height"));

        $original_grid.css("height",$temp_grid.css("height"));
        $original_grid.css("border-left",grid_width+"px solid purple");
    }
}

function deactivate_grid($data_set,data,grid_width){
    var start_index = data[1];
    var end_index = data[2];
    for (var i = start_index ; i <= end_index;i++){
        $original_grid = $data_set.children().eq(i);
        $original_grid.css("border-left",grid_width+"px solid black");
    }
}

function restore_orginal($data_set,data,grid_width,original){
    var start_index = data[1];
    var end_index = data[2];
    for (var i = end_index ; i >= start_index;i--){
        $original_grid = $data_set.children().eq(i);
        $original_grid.css("height",original.pop());
    }
    deactivate_grid($data_set,data,grid_width);
}

//generate random numbers
function getRandomIntegerArray(min, max, size){
    var random_numbers = [];
    for (var i = 0; i < size ; i++){
        random_numbers.push(getRndInteger(min,max));
    }
    return random_numbers;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

//sorting algorithm

function mergeSort(array,sort_array,first ,last){
    if(first < last){
        var middle = Math.floor((first + last)/2);
        mergeSort(array,sort_array,first, middle);
        mergeSort(array,sort_array,middle + 1 , last);
        merge(array,sort_array,first, middle, middle + 1 , last);
    }
}

function merge(array,sort_array,leftfirst, leftlast, rightfirst, rightlast){
    
    var index = leftfirst;
    var currentindex = leftfirst;
    var temp = [];
    while(leftfirst <= leftlast && rightfirst <= rightlast){
        if(array[leftfirst] < array[rightfirst]){
            temp[index] = array[leftfirst];
            sort_array.push(["create",index,leftfirst]);
            leftfirst ++;
        }else{
            temp[index] = array[rightfirst];
            sort_array.push(["create",index,rightfirst]);
            rightfirst ++;
        }
        index++;
    }
    while(leftfirst <= leftlast){
        sort_array.push(["create",index,leftfirst]);
        temp[index] = array[leftfirst];
        leftfirst ++;
        index++;
    }
    while(rightfirst <= rightlast){
        sort_array.push(["create",index,rightfirst]);
        temp[index] = array[rightfirst];
        rightfirst ++;
        index ++;
    }
        
    for(var i = currentindex ; i <= rightlast ; i++)
        array[i] = temp[i];
    sort_array.push(["replace",currentindex,rightlast]);
}