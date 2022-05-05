var nodeSparkline = require("node-sparkline")
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const values = [1.3, 1.23, 1.24, 1.25, 1.83, 0.23, 0.31, 0.373, 0.238973, 0.33231, 0.38236632, 0.40973, 0.42013973, 0.8321, 0.893, 0.9531];
const writeFile = promisify(fs.writeFile);
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient('https://ylcxvfbmqzwinymcjlnx.supabase.co/','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0ODYzMjA0NCwiZXhwIjoxOTY0MjA4MDQ0fQ.mglWsLVJ1Exuqd84Dm7AhR0dutrUKDJNpGIX55TJePM',
)
const main = async () => {

  let { data, error } = await supabase.from('assets').select('id');

  if(error) {
    console.error(error)
    return
  }
  if (data) { // SI ON RECUPERE DATA 

    for(var i=0;i<data.length;i++) { // ON BOUCLE CHAQUE ID 

      let { data: price, error } = await supabase // ON FETCH LE PRIX POUR CHAQUE ARTICLE
      .from('assets')
      .select('price')
      console.log(price[i])
    
      async function test() {
        try {
          const svg = nodeSparkline({
            price,
            width: 135,
            height: 50,
            stroke: '#57bd0f',
            strokeWidth: 1.25,
            strokeOpacity: 1,
          });
          await writeFile(path.join(__dirname, `${data[i]}sparkline.svg`), svg);
        } catch (e) {
          console.error(e.toString());
          console.log("not working")
        }
      };
      test()

    }

  }

  // let { data: assets,  error) } = await supabase
  //       .from('assets')
  //       .select('name')
  //           console.log(assets)
  //           if(errorTest) {
  //             console.error(errorTest)
  //             return
  //           }
  //           if (test) {
  //             for(var i=0;i<test.length;i++) {
  //               console.log(test[i])
  //             }
  //           }

}

main()
