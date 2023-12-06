var NajblizszyObiekt = [];
var PoprzedniObiekt = [];
function SprawdzStroneKolizji(IdKolizji)
{
    let OdlegloscLewej = mapa[AktualnaMapa][IdKolizji][1]
    let OdlegloscGory = mapa[AktualnaMapa][IdKolizji][2] 
    let OdlegloscPrawej = mapa[AktualnaMapa][IdKolizji][1]+id[mapa[AktualnaMapa][IdKolizji][0]][3] 
    let OdlegloscDolnej = mapa[AktualnaMapa][IdKolizji][2]+id[mapa[AktualnaMapa][IdKolizji][0]][2]
    let PozycjaGracza=[PozycjaX+25,PozycjaY+25];

    if(PozycjaGracza[0]+25<=OdlegloscLewej && PozycjaGracza[1]-25>=OdlegloscDolnej || PozycjaGracza[0]+25<=OdlegloscLewej && PozycjaGracza[1]+25<=OdlegloscGory || PozycjaGracza[0]-25>=OdlegloscPrawej && PozycjaGracza[1]-25>=OdlegloscDolnej || PozycjaGracza[0]-25>=OdlegloscPrawej && PozycjaGracza[1]+25<=OdlegloscGory)
    {
        ListaAktualnychObiektowDoKolizji[IdKolizji][3]=true;
        ListaAktualnychObiektowDoKolizji[IdKolizji][4]=true;
    }
    if(ListaAktualnychObiektowDoKolizji[IdKolizji][2]==undefined)
    {
        ListaAktualnychObiektowDoKolizji[IdKolizji][3]=true;
        ListaAktualnychObiektowDoKolizji[IdKolizji][4]=true;
    }
    
    if(PozycjaGracza[0]+25>OdlegloscLewej && PozycjaGracza[0]-25<OdlegloscPrawej && ListaAktualnychObiektowDoKolizji[IdKolizji][3])
    {
        ListaAktualnychObiektowDoKolizji[IdKolizji][4]=false;
        if(PozycjaGracza[1]<OdlegloscGory)
        {
            return "nad";
        }
        if(PozycjaGracza[1]>OdlegloscDolnej)
        {
            return "pod";
        }
    }

    if(PozycjaGracza[1]+25>OdlegloscGory && PozycjaGracza[1]-25<OdlegloscDolnej && ListaAktualnychObiektowDoKolizji[IdKolizji][4])
    {
        ListaAktualnychObiektowDoKolizji[IdKolizji][3]=false;
        if(PozycjaGracza[0]<OdlegloscLewej)
        {
            return "nalewo";
        }
        if(PozycjaGracza[0]>OdlegloscPrawej)
        {
            return "naprawo";
        }
    }
}

var ListaAktualnychObiektowDoKolizji = [];

function SprawdzObiektyDoKolizji()
{
    if(ListaAktualnychObiektowDoKolizji!=null)
    {
        ListaAktualnychObiektowDoKolizji = [];
    }
    for(i=0;i<mapa[AktualnaMapa].length;i++)
    {
        ListaAktualnychObiektowDoKolizji.push([i,mapa[AktualnaMapa][i],null,true,true]);
    }
}
var Odbilsie;
function Kolizje()
{
    for(i=0;i<mapa[AktualnaMapa].length;i++)
    {
        ListaAktualnychObiektowDoKolizji[i][2]=SprawdzStroneKolizji(i);

        if(SprawdzKolizjeX(PozycjaX,50,i,0))
        {

            if(PozycjaX+50 >= mapa[AktualnaMapa][i][1] && ListaAktualnychObiektowDoKolizji[i][2]=="nalewo")
            {
                PozycjaX = mapa[AktualnaMapa][i][1]-50;
                Gracz.style.left = PozycjaX + 'px';
            }
            if(PozycjaX < mapa[AktualnaMapa][i][1]+id[mapa[AktualnaMapa][i][0]][3] && ListaAktualnychObiektowDoKolizji[i][2]=="naprawo")
            {
                PozycjaX = mapa[AktualnaMapa][i][1]+id[mapa[AktualnaMapa][i][0]][3];
                Gracz.style.left = PozycjaX + 'px';
            }

            if(SprawdzKolizjeY(PozycjaY,50,i,0))
            {
                if(NajblizszyObiekt==null && PoprzedniObiekt==null)
                {
                    NajblizszyObiekt = mapa[AktualnaMapa][i];
                }
                else
                {
                    PoprzedniObiekt=NajblizszyObiekt;
                    NajblizszyObiekt = mapa[AktualnaMapa][i];
                }
                if(NajblizszyObiekt!=PoprzedniObiekt && PoprzedniObiekt!=null)//JESLI KOLIZIUJE Z INNYM OBIEKTEM PO RAZ 1
                {
                    if(ListaAktualnychObiektowDoKolizji[i][2]=="nad")
                    {
                        KoniecSkoku();
                    }
                    if(ListaAktualnychObiektowDoKolizji[i][2]=="pod")
                    {
                        Czas=60;
                    }
                    if(ListaAktualnychObiektowDoKolizji[i][2]=="nalewo" || ListaAktualnychObiektowDoKolizji[i][2]=="naprawo")
                    {
                        CzyLewo*=(-1)/2*(Skok/100);
                        Odbilsie=1;
                    }
                }
                //KOLIZIUJE Z INNYM OBIEKTEM
                //kolizje działają w taki sposób, że kiedy gracz osiągnie pozycję ściany obiektu i wejdzie on w nią
                //(np. pozycja gracza będzie wieksza niż pozycja lewej ścianki) PLUS do tego pozycja gracza będzie
                //mniejsza niż pozycja ścianki obiektu TEJ SAMEJ, lecz maksymalnie do 1 wartości więcej (np, pozycja
                //gracza będzie wieksza niż pozycja lewej ścianki + będzie mniejsza niż pozycja lewej ścianki+1) to cofa gracza
                if(PozycjaY+50 >= mapa[AktualnaMapa][i][2] && ListaAktualnychObiektowDoKolizji[i][2]=="nad")
                {
                    Spada=false;
                    PozycjaY = mapa[AktualnaMapa][i][2]-50;
                    grawitacja=0;
                    Gracz.style.top = PozycjaY + 'px';
                    CanMove = true;
                    CanJump = true;
                }
                if(PozycjaY < mapa[AktualnaMapa][i][2]+id[mapa[AktualnaMapa][i][0]][2] && ListaAktualnychObiektowDoKolizji[i][2]=="pod")
                {
                    PozycjaY = mapa[AktualnaMapa][i][2]+id[mapa[AktualnaMapa][i][0]][2];
                    Gracz.style.top = PozycjaY + 'px';
                }
            }
        }
    }
}

function SprawdzKolizjeX(ObjX,size,Id,plus)
{
    return (
        ObjX+size > mapa[AktualnaMapa][Id][1]-plus &&
        ObjX < mapa[AktualnaMapa][Id][1] + id[mapa[AktualnaMapa][Id][0]][3]+plus
    );
}
function SprawdzKolizjeY(ObjY,size,Id,plus)
{
    return (
        ObjY+size > mapa[AktualnaMapa][Id][2]-plus  &&
        ObjY < mapa[AktualnaMapa][Id][2] + id[mapa[AktualnaMapa][Id][0]][2]+plus
    );
}