
function onLoad() {  
    var totalPoints = 16;
    var currentPoints = 0;
    
    $('#points').html("Points Remaining: "+totalPoints);

    Object.keys(variables['Weapons']).forEach( i => {
        $('[id^=DropWeapons]').append($('<option>', {
            value: variables['Weapons'][i]['value'],
            peasant : variables['Weapons'][i]['Peasant'],
            text: i + " ["+ variables['Weapons'][i]['value'].toString() + "]" + (variables['Weapons'][i]['Peasant'] == true ? " (Peasant)" : "")
        }))
    });
    Object.keys(variables['Armor']).forEach( i => {
        $('[id^=DropArmor]').append($('<option>', {
            value: variables['Armor'][i]['value'],
            peasant : variables['Armor'][i]['Peasant'],
            text: i + " ["+ variables['Armor'][i]['value'].toString() + "]" + (variables['Armor'][i]['Peasant'] == true ? " (Peasant)" : "")
        }));
    });
    Object.keys(variables['Perks']).forEach( i => {
        $('#perks').append($('<input>', {
            type: 'checkbox',
            name: variables['Perks'][i]['name'],
            value: variables['Perks'][i]['value'],
            id: "CheckPerk" + i,
            class: "checks"
        })).append(i + " ["+ variables['Perks'][i]['value'].toString() + "]<br>");
    });

    currentPoints = totalPoints;

    function refresh() {
        console.log("refresh");
        var spendingPoints = 0;
        $('[id^=Drop] :selected').each(function(i, sel){
            spendingPoints = spendingPoints + parseInt($(sel).val());
        });
        $('input[type=checkbox]').each(function () {
            if (this.checked){
                 spendingPoints = spendingPoints + parseInt($(this).val());
                 console.log(this.name);
                 if(this.name == "Peasant") {
                    console.log("fdsafsafdas");
                    // $('[id^=Drop] > option').each(function() {
                    //     if(this.text.includes("Peasant")){
                    //         $("[id^=Drop] option:contains('Peasant')").prop('disabled', true);
                    //         console.log(this.value)

                    //     }
                    // });
                 }
            }
        });
        currentPoints = totalPoints - spendingPoints;
        $('#points').html("Points Remaining: "+currentPoints);

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
                if (!this.checked) {
                    $(this).attr("disabled", true);
                }
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