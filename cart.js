
var cartController = function($scope){
    $scope.data=[
        {
            id:"1001",
            name:"ipad",
            quantity:3,
            price:2000
        },
         {
            id:"1002",
                name:"iphone5",
                quantity:6,
            price:6000
         },
        {
            id:"1003",
                name:"imac",
            quantity:8,
            price:8000
        },
        {
            id:"1004",
                name:'iwatch',
            quantity:15,
            price:5000
        }
        ];
      $scope.totalPrice = function(){
          var total=0;
          angular.forEach($scope.data,function(item){
              total+=item.quantity*item.price;
          });
          return total;
      };
      $scope.totalQuantity = function(){
          var count=0;
          angular.forEach($scope.data,function(item){
              count+=parseInt(item.quantity);
          });
          return count;
      };
      //查找一个索引值
    var findIndex = function(id){
        var index=-1;
        angular.forEach($scope.data,function(item,key){
            if($scope.id==id){
                index=key;
            }
            return index;
        });

    };
    $scope.remove = function(id){
        var index=findIndex(id);
        if(index!==-1){
            $scope.data.splice(index,1);
        }
    };
    //减少一个产品数量
    $scope.reduce=function(id){
        var index=findIndex(id);
        if(index!==-1){
            var item=$scope.data[index];
            if(item.quantity>1){
                --item.quantity;
            }else{
                var returnWarn=confirm("您确定要删除该产品");
                if(returnWarn){
                    $scope.remove(id);
                }
            }
        }

    };
    //增加一个产品数量
    $scope.add=function(id){
        var index=findIndex(id);
        if(index!==-1){
            ++$scope.data[index].quantity;
        }
    };
    //脏检查所有data,当输入的数据是负数的时候
    $scope.$watch('data',function(newValue,oldValue){
        //newValue与oldValue都表示的是整体的data数组数据，只是new是更改过最新版的而old是原先的数据
        //对最新的数据newValue进行遍历循环。item仍然表示的是数组中的每个对象{}，key表示数组的索引
        angular.forEach(newValue,function(item,key){
            if(item.quantity<1){
                var returnWarn=confirm("产品数量不能为负数，您确定要删除该产品");
                if(returnWarn){
                    $scope.remove(item.id);
                    return;
                }else{
                    item.quantity=oldValue[key].quantity;
                }
            }

        });

    },true);
};