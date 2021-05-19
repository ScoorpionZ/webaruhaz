$(function(){
    $("#OK").click(ment);
    formatumAtalakit();
});

function ment(){
    var ujtermek={};
        ujtermek.cikkszam=$("#cikkszam").val();
        ujtermek.termekNev=$("#termekNev").val();
        ujtermek.gyarto=$("#gyarto").val();
        ujtermek.ar=$("#ar").val();
        ujtermek.beszerzesDatuma=$("#beszerzesDatuma").val();
        if($("input:radio[name=import]:checked").val()==="i"){
            ujtermek.import="Igen";
        }
        else{
            ujtermek.import="Nem";
        }
    termekAdatok.push(ujtermek);
    kiir();
}
function kiir(){
    $("article").empty();
    $("article").append("<tabel></table>");
    $("article>tabel").append("<tr><th id='cikkszam'>Cikkszám</th><th id='termekNev'>Terméknév</th><th id='gyarto'>Gyártó</th><th id='ar'>Ár</th><th id='beszerzesDatuma'>Beszerzés détuma</th><th id='import'>Import</th><th>Törlés</th></tr>");
    for (let i = 0; i < termekAdatok.length; i++) {
        $("article>tabel").append("<tr>");
        for(var item in termekAdatok[i]){
            $("article>tabel>tr").eq(i+1).append("<td>"+termekAdatok[i][item]+"</td>");
        }
        $("article>tabel>tr").eq(i+1).append("<td><input>");
        $("article>tabel>tr>td>input").eq(i).attr("type", "button");
        $("article>tabel>tr>td>input").eq(i).attr("id", i);
        $("article>tabel>tr>td>input").eq(i).attr("value", "Törlés");
    }
    $("article>tabel>tr>td>input").click(torol);
    $("article>tabel>tr>th").click(rendez);
}
function torol(){
    var id = $(this).attr("id");
    delete termekAdatok[id];
    
     kiir();
     $("article>tabel>tr").eq(id+1).remove();

 }

var termekAdatok=[{
    cikkszam:"10053",
    termekNev:"Televízió",
    gyarto:"Samsung",
    ar:"44800",
    beszerzesDatuma:"2000-09-22",
    import:"Igen"
},
{
    cikkszam:"24410",
    termekNev:"Nyomtató",
    gyarto:"Serox",
    ar:"11590",
    beszerzesDatuma:"2000-10-02",
    import:"Nem"
}
];

var termekAdatokJ='[{"cikkszam":"10053","termekNev":"Televízió","gyarto":"Samsung","ar":"44800","beszerzesDatuma":"2000-09-22","import":"Igen"},{"cikkszam":"24410","termekNev":"Nyomtató","gyarto":"Serox","ar":"11590","beszerzesDatuma":"2000-10-02","import":"Nem"}]';

function formatumAtalakit(){
    var termekAdatokTombJ=JSON.parse(termekAdatokJ);
    console.log(termekAdatokTombJ);
}
var irany = true;
function rendez(){
    console.log(termekAdatok);
    var id = $(this).attr("id");
    console.log(id);
    if(irany==true){
        termekAdatok.sort(
            function(a,b){
                console.log(eval(`a.${id}`).toLowerCase());
                if(id=="termekNev" ||  id=="gyarto" || id=="beszerzesDatuma" || id=="import"){
                    return Number(eval(`a.${id}`).toLowerCase() > eval(`b.${id}`).toLowerCase())-0.5;
                }
                else{
                    return eval(`a.${id}`)- eval(`b.${id}`);
                }
                
            }
        );
        irany=false;
    }
    else{
        termekAdatok.sort(
            function(a,b){
                if(id=="termekNev" ||  id=="gyarto" || id=="beszerzesDatuma" ||     id=="import"){
                    return Number(eval(`a.${id}`).toLowerCase() < eval(`b.${id}`).toLowerCase())-0.5;
                }
                else{
                    return eval(`b.${id}`)-eval(`a.${id}`);
                }
            }
        );  
        irany=true;
    }
    
    kiir();
}