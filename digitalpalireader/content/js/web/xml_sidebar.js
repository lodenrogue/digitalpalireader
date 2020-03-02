var DPRXML = {
  updateHierarchy: function (depth, event) { // depth: 4=section, 3=sutta..., 2=vagga..., 1=volume..., 0=all

    document.activeElement.blur();

    var nikaya = $('#set').value;
    var book = $('#book').value;
    var nikbookhier = nikaya + book + G_hier;
    var xmlDoc = loadXMLFile(nikbookhier, 0);


    var meta = (depth > 0 ? $('#meta').selectedIndex : 0);
    var volume = (depth > 1 ? $('#volume').selectedIndex : 0);
    var vagga = (depth > 2 ? $('#vagga').selectedIndex : 0);
    var sutta = (depth > 3 ? $('#sutta').selectedIndex : 0);


    var nik = nikaya;

    var xml, axml, lista, list, name, namea;

    axml = xmlDoc.getElementsByTagName("ha");
    namea = axml[0].getElementsByTagName("han");
    if (namea[0].childNodes[0] && namea[0].textContent.length > 1) name = namea[0].textContent.replace(/\{.*\}/, '').replace(/^  */, '').replace(/  *$/, '');
    else name = this.unnamed;
    var outname = translit(toUni(name));
    $('#title').value = outname;

    var u = xmlDoc.getElementsByTagName("h0");
    var v = u[meta].getElementsByTagName("h1");
    var w = v[volume].getElementsByTagName("h2");
    var x = w[vagga].getElementsByTagName("h3");
    var y = x[sutta].getElementsByTagName("h4");


    switch (true) {
      case (depth == 0): // remake meta list
        lista = this.makeTitleSelect(u, 'h0n');

        var listNode = $('#meta');
        listNode.empty();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          listNode.append(`<option>${this.unnamed}</option>`);
          listNode.parentNode.hide();
        }
        else {
          for (idx in lista) {
            listNode.append(`<option>${lista[idx]}</option>`);
          }
          listNode.parentNode.show();
        }
        listNode.prop('selectedIndex', 0);
      case (depth < 2): // remake volume list
        lista = this.makeTitleSelect(v, 'h1n');
        var listNode = $('#volume');
        listNode.empty();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          listNode.append(`<option>${this.unnamed}</option>`);
          listNode.parentNode.hide();
        }
        else {
          for (idx in lista) {
            listNode.append(`<option>${lista[idx]}</option>`);
          }
          listNode.parentNode.show();
        }
        listNode.prop('selectedIndex', 0);

      case (depth < 3): // remake vaggalist
        lista = this.makeTitleSelect(w, 'h2n');
        var listNode = $('#vagga');
        listNode.empty();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          listNode.append(`<option>${this.unnamed}</option>`);
          listNode.parentNode.hide();
        }
        else {
          for (idx in lista) {
            listNode.append(`<option>${lista[idx]}</option>`);
          }
          listNode.parentNode.show();
        }
        listNode.prop('selectedIndex', 0);
      case (depth < 4): // remake sutta list on depth = 0, 2, or 3
        lista = this.makeTitleSelect(x, 'h3n');
        var listNode = $('#sutta');
        listNode.empty();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          listNode.append(`<option>${this.unnamed}</option>`);
          listNode.parentNode.hide();
        }
        else {
          for (idx in lista) {
            listNode.append(`<option>${lista[idx]}</option>`);
          }
          listNode.parentNode.show();
        }
        listNode.prop('selectedIndex', 0);
      default: // remake section list

        lista = this.makeTitleSelect(y, 'h4n');

        listNode = $('#section');
        listNode.empty();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          listNode.append(`<option>${this.unnamed}</option>`);
          listNode.parentNode.hide();
        }
        else {
          for (idx = 0; idx < lista.length; idx++) {
            listNode.append(`<option>${lista[idx]}</option>`);
          }
          listNode.parentNode.show();
        }
        listNode.prop('selectedIndex', 0);
        break;
    }

    // buttons

    if (!$('#section').parentNode.is(':visible')) {
      if (!$('#sutta').parentNode.is(':visible')) {
        if (!$('#vagga').parentNode.is(':visible')) {
          if (!$('#volume').parentNode.is(':visible')) {
            if (!$('#meta').parentNode.is(':visible')) {
              $('#meta-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,2)");
            }
            else {
              $('#meta-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event))");
              $('#meta-b').childNodes[0].setAttribute('value', "⇒");
            }
          }
          else {
            $('#meta-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,2)");
            $('#meta-b').setAttribute('tooltiptext', "Combine all sub-sections");
            $('#meta-b').childNodes[0].setAttribute('value', "≡");

            $('#volume-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event))");
            $('#volume-b').setAttribute('tooltiptext', "View this section");
            $('#volume-b').childNodes[0].setAttribute('value', "⇒");
          }
        }
        else {
          $('#meta-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,2)");
          $('#meta-b').setAttribute('tooltiptext', "Combine all sub-sections");
          $('#meta-b').childNodes[0].setAttribute('value', "≡");

          $('#volume-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,3)");
          $('#volume-b').setAttribute('tooltiptext', "Combine all sub-sections");
          $('#volume-b').childNodes[0].setAttribute('value', "≡");

          $('#vagga-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event))");
          $('#vagga-b').setAttribute('tooltiptext', "View this section");
          $('#vagga-b').childNodes[0].setAttribute('value', "⇒");
        }
      }
      else {
        $('#meta-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,2)");
        $('#meta-b').setAttribute('tooltiptext', "Combine all sub-sections");
        $('#meta-b').childNodes[0].setAttribute('value', "≡");
        $('#volume-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,3)");
        $('#volume-b').setAttribute('tooltiptext', "Combine all sub-sections");
        $('#volume-b').childNodes[0].setAttribute('value', "≡");
        $('#vagga-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,4)");
        $('#vagga-b').setAttribute('tooltiptext', "Combine all sub-sections");
        $('#vagga-b').childNodes[0].setAttribute('value', "≡");
        $('#sutta-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event))");
        $('#sutta-b').setAttribute('tooltiptext', "View this section");
        $('#sutta-b').childNodes[0].setAttribute('value', "⇒");
      }
    }
    else {
      $('#meta-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,2)");
      $('#meta-b').setAttribute('tooltiptext', "Combine all sub-sections");
      $('#meta-b').childNodes[0].setAttribute('value', "≡");
      $('#volume-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,3)");
      $('#volume-b').setAttribute('tooltiptext', "Combine all sub-sections");
      $('#volume-b').childNodes[0].setAttribute('value', "≡");
      $('#vagga-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,4)");
      $('#vagga-b').setAttribute('tooltiptext', "Combine all sub-sections");
      $('#vagga-b').childNodes[0].setAttribute('value', "≡");
      $('#sutta-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,5)");
      $('#sutta-b').setAttribute('tooltiptext', "Combine all sub-sections");
      $('#sutta-b').childNodes[0].setAttribute('value', "≡");
      $('#section-b').setAttribute('onmouseup', "DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event))");
      $('#section-b').setAttribute('tooltiptext', "View this section");
      $('#section-b').childNodes[0].setAttribute('value', "⇒");
    }

  },

  updateSearchHierarchy: function (depth) { // depth: 4=section, 3=sutta..., 2=vagga..., 1=volume..., 0=all
    document.activeElement.blur();

    var nikaya = $('#tsoSETm').val();
    var book = $('#tsoBOOKm').val();
    var hiert = $('#tsoMAT2m').val();
    var nikbookhier = nikaya + book + hiert;

    var xmlDoc = loadXMLFile(nikbookhier, 0);

    var nik = nikaya;

    var meta = (depth > 0 ? $('#tsoPmeta').prop('selectedIndex') : 0);
    var volume = (depth > 1 ? $('#tsoPvolume').prop('selectedIndex') : 0);
    var vagga = (depth > 2 ? $('#tsoPvagga').prop('selectedIndex') : 0);
    var sutta = (depth > 3 ? $('#tsoPsutta').prop('selectedIndex') : 0);

    var xml, axml, lista, list, name, namea;

    axml = xmlDoc.getElementsByTagName("ha");
    namea = axml[0].getElementsByTagName("han");
    if (namea[0].childNodes[0] && namea[0].textContent.length > 1) name = namea[0].textContent.replace(/\{.*\}/, '').replace(/^  */, '').replace(/  *$/, '');
    else name = this.unnamed;
    var outname = translit(toUni(name));

    var u = xmlDoc.getElementsByTagName("h0");
    var v = u[meta].getElementsByTagName("h1");
    var w = v[volume].getElementsByTagName("h2");
    var x = w[vagga].getElementsByTagName("h3");
    var y = x[sutta].getElementsByTagName("h4");

    $('#tsoPR').prop('selectedIndex', 0);

    switch (true) {
      case (depth == 0): // remake meta list
        lista = this.makeTitleSelect(u, 'h0n');

        var listNode = $('#tsoPmeta');
        listNode.empty();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          listNode.append(`<option>${this.unnamed}</option>`);
          $('#tsoP1').hide();
          $('#tsoPR').prop('selectedIndex', 1);
        }

        else {
          for (idx in lista) {
            listNode.append(`<option>${lista[idx]}</option>`);
          }
          $('#tsoP1').show();
        }
        listNode.prop('selectedIndex', 0);
      case (depth < 2): // remake volume list
        lista = this.makeTitleSelect(v, 'h1n');
        var listNode = $('#tsoPvolume');
        listNode.empty();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          listNode.append(`<option>${this.unnamed}</option>`);
          $('#tsoP2').hide();
          if ($('#tsoPR').prop('selectedIndex') == 1) $('#tsoPR').prop('selectedIndex', 2);
        }

        else {
          for (idx in lista) {
            listNode.append(`<option>${lista[idx]}</option>`);
          }
          $('#tsoP2').show();
        }
        listNode.prop('selectedIndex', 0);

      case (depth < 3): // remake vaggalist
        lista = this.makeTitleSelect(w, 'h2n');
        var listNode = $('#tsoPvagga');
        listNode.empty();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          listNode.append(`<option>${this.unnamed}</option>`);
          $('#tsoP3').hide();
          if ($('#tsoPR').prop('selectedIndex') == 2) $('#tsoPR').prop('selectedIndex', 3);
        }

        else {
          for (idx in lista) {
            listNode.append(`<option>${lista[idx]}</option>`);
          }
          $('#tsoP3').show();
        }
        listNode.prop('selectedIndex', 0);
      case (depth < 4): // remake sutta list on depth = 0, 2, or 3
        lista = this.makeTitleSelect(x, 'h3n');
        var listNode = $('#tsoPsutta');
        listNode.empty();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          listNode.append(`<option>${this.unnamed}</option>`);
          $('#tsoP4').hide();
          if ($('#tsoPR').prop('selectedIndex') == 3) $('#tsoPR').prop('selectedIndex', 4);
        }

        else {
          for (idx in lista) {
            listNode.append(`<option>${lista[idx]}</option>`);
          }
          $('#tsoP4').show();
        }
        listNode.prop('selectedIndex', 0);
      default: // remake section list

        lista = this.makeTitleSelect(y, 'h4n');

        listNode = $('#tsoPsection');
        listNode.empty();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          listNode.append(`<option>${this.unnamed}</option>`);
          $('#tsoP5').hide();
        }
        else {
          for (idx = 0; idx < lista.length; idx++) {
            listNode.append(`<option>${lista[idx]}</option>`);
          }
          $('#tsoP5').show();
        }
        listNode.prop('selectedIndex', 0);
        break;
    }

    DPROpts.chooseSearchHier();
  },

  makeTitleSelect: function (xml, tag) { // output menupopup tag with titles in menuitems
    var name, namea;
    var outlist = [];
    for (var a = 0; a < xml.length; a++) {
      name = xml[a].getElementsByTagName(tag);
      if (name[0].childNodes[0] && name[0].textContent.replace(/ /g, '').length > 0) namea = name[0].textContent.replace(/\{.*\}/, '').replace(/^  */, '').replace(/  *$/, '');
      else {
        namea = this.unnamed;
        outlist.push(namea);
        continue;
      }

      namea = translit(toUni(namea));

      outlist.push(namea);
    }
    return outlist;
  },


  unnamed: '[unnamed]',
}
