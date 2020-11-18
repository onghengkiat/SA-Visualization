
$(document).ready(function() {
    var $size = $("#size");
    var $speed = $("#speed");
    var $data_set = $("#data_set");
    var $alert_holder = $("#alert_holder");

    var $start = $("#start");
    var $stop = $("#stop");
    var $previous = $("#previous");
    var $next = $("#next");

    var $time = $("#time");

    var interval;
    var count = 0;
    var sort_array = [];
    
    var grid_width = 800/$size.val();

    renderPage(sort_array,$data_set,$size,$time,grid_width);
    console.log(sort_array);
    $size.on('change',function(){
        count = 0;
        sort_array = [] ;
        grid_width = 800/$size.val();

        clearInterval(interval);
        renderPage(sort_array,$data_set,$size, $time,grid_width);        
    });

    $speed.on('change',function(){
        count = 0;
        sort_array = [] ;
        grid_width = 800/$size.val();

        clearInterval(interval);
        renderPage(sort_array,$data_set,$size, $time,grid_width);        
    });

    $start.on('click', function(){
        clearInterval(interval);
        var sleep_time = 1000/$speed.val();
        if (count >= sort_array.length){
            return;
        };
        
        interval = setInterval(function(){
            var data = sort_array[count];
            if(data[0] === "swap"){
                swap_grid($data_set,data);
            }
            
            count ++;
            if (count >= sort_array.length){
                clearInterval(interval);
                return;
            };
            deactivate_grid($data_set,data,grid_width);
            data = sort_array[count];
            activate_grid($data_set,data,grid_width);

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
            var data = sort_array[count];
            deactivate_grid($data_set,data,grid_width);
            count --;
            data = sort_array[count];
            if(data[0] === "swap"){
                swap_grid($data_set,data);
            }
            activate_grid($data_set,data,grid_width);
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
        };

        if (count < sort_array.length ){
            var data = sort_array[count];
            if(data[0] === "swap"){
                swap_grid($data_set,data);
            }
            
            count ++;
            if(count >= sort_array.length){
                return;
            }
            deactivate_grid($data_set,data,grid_width);
            data = sort_array[count];
            activate_grid($data_set,data,grid_width);
        }
    })
});


//render page
function renderPage(sort_array,$data_set,$size,$time,grid_width){
    
    random_numbers = getRandomIntegerArray(10,500,$size.val());

    $data_set.html("");
    var grid_border = grid_width+1;
    random_numbers.forEach(function(value){
        
        style="'border-left: "+grid_width+"px solid black;width:"+grid_border+"px;height:"+value+ "px;'";
        $data_set.append("<div class='vertical' style="+style+"></div>");
    })
    var start_time = new Date();
    quickSort(random_numbers,sort_array,0,random_numbers.length-1);
    var end_time = new Date();
    var diff_time = end_time.getTime() - start_time.getTime();
    $time.html("Sorting time: "+diff_time + "ms");

    var data = sort_array[0];
    activate_grid($data_set,data,grid_width);
}

//light up the grid
function activate_grid($data_set,data,grid_width){
    var index1 = data[1];
    var index2 = data[2];
    $first_value = $data_set.children().eq(index1);
    $second_value = $data_set.children().eq(index2);
    if(data[0] === "compare"){
        $first_value.css("border-left",grid_width+"px solid green");
        $second_value.css("border-left",grid_width+"px solid green");
    }else{
        $first_value.css("border-left",grid_width+"px solid red");
        $second_value.css("border-left",grid_width+"px solid red");
    }
}

function deactivate_grid($data_set,data,grid_width){
    var index1 = data[1];
    var index2 = data[2];
    $first_value = $data_set.children().eq(index1);
    $second_value = $data_set.children().eq(index2);
    $first_value.css("border-left",grid_width+"px solid black");
    $second_value.css("border-left",grid_width+"px solid black");
}


//swap the grid
function swap_grid($data_set,data){
    var index1 = data[1];
    var index2 = data[2];
    if(index1 == index2){
        return;
    };

    $first_value = $data_set.children().eq(index1);
    $second_value = $data_set.children().eq(index2);

    if(index1 > index2){

        if(index1 == index2 + 1){
            $second_value.insertAfter($first_value);
            return;
        };

        $third_value = $data_set.children().eq(index1-1);

        $first_value.insertAfter($second_value);
        $second_value.insertAfter($third_value);
    }else{
        if(index2 == index1 + 1){
            $first_value.insertAfter($second_value);
            return;
        }

        $third_value = $data_set.children().eq(index2-1);

        $second_value.insertAfter($first_value);
        $first_value.insertAfter($third_value);
    };
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

function swap(array,sort_array, index1, index2){
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    sort_array.push(["swap",index1,index2]);
}


//Sorting algorithms 
function quickSort(array,sort_array,first,last){
    if(first < last){
        var splitindex = split(array,sort_array,first,last);
        quickSort(array,sort_array,first,splitindex-1);
        quickSort(array,sort_array,splitindex+1,last);
    }
}

function split(array,sort_array,first,last){
    var splitValue = array[first];
    var first_index = first;
    do {
        while(true){
            if( splitValue < array[first]){
                break;
            }else {
                sort_array.push(["compare",first_index,first]);
                first ++;
                if( first > last){
                    break;
                }
            }
        }

        if(first <= last){
            while(true){
                if(splitValue >= array[last]){
                    break;
                }else{
                    sort_array.push(["compare",last,first]);
                    last --;
                    if(first > last){
                        break;
                    }
                }
            }
        }

        if(first < last){
            swap(array,sort_array,first,last)
            first ++;
            last --;
        }
    }while(first <= last);
    
    swap(array,sort_array,first_index,last);
    return last;
}
