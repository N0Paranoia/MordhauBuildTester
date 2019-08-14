
function onLoad() {  
    var totalPoints = 16;
    var currentPoints = 0;
    
    Object.keys(variables['Weapons']).forEach( i => {
        $('[id^=DropWeapons]').append($('<option>', {
            value: variables['Weapons'][i],
            text: i + " ["+ variables['Weapons'][i].toString() + "]"
        }))
    });
    Object.keys(variables['Armor']).forEach( i => {
        $('[id^=DropArmor]').append($('<option>', {
            value: variables['Armor'][i],
            text: i + " ["+ variables['Armor'][i].toString() + "]"
        }));
    });
    Object.keys(variables['Perks']).forEach( i => {
        $('#perks').append($('<input>', {
            type: 'checkbox',
            name: i,
            value: variables['Perks'][i],
            id: "CheckPerk" + i
        })).append(i + " ["+ variables['Perks'][i].toString() + "]<br>");
    });

    currentPoints = totalPoints;

    function refresh() {
        console.log("refresh");
        var spendingPoints = 0;
        $('[id^=Drop] :selected').each(function(i, sel){
            spendingPoints = spendingPoints + parseInt($(sel).val());
        });
        $('input[type=checkbox]').each(function () {
            if (this.checked) {
                spendingPoints = spendingPoints + parseInt($(this).val()); 
            }
        });
        currentPoints = totalPoints - spendingPoints;
        // console.log(currentPoints);
        $('[id^=Drop] > option').each(function() {
            if(this.value > currentPoints){
                $('[id^=Drop] option[value='+this.value+']').prop('disabled', true);
            }
            else {
                $('[id^=Drop] option[value='+this.value+']').prop('disabled', false);
            }
        })
        $('input[type=checkbox]').each(function () {
            if(this.value > currentPoints){
                $(this).attr("disabled", true);
            }
            else {
                $(this).attr("disabled", false);
            }
        });
    }

    $('[id^=Drop]').change(function(){
        refresh();
    });
    $('[id^=CheckPerk]').change(function(){
        refresh();
    });
       
}