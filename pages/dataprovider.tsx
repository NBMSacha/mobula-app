import React from 'react'
import ethers from 'ethers'

export default function Search() {
    
  return (
      
    <>
    <div className="listing">
            <div className="container">
                <header>
                    <h1>Data provider</h1>
                    <span>
                    Input a token address in the search bar. Wait a few seconds. Open the eyes, and see all the meta-data you’ll ever need: the website, the community chat, and tens of other metrics.
                    </span>
                </header>

                <div className="line"></div>
                <form>
                    <div>
                        <h2>Search</h2>
                        <div className="form-input">
                            <label htmlFor="contract">Simply input a crypto-token</label>
                            <div>
                                <input
                                    className="long"
                                    placeholder="0x..."
                                    required
                                ></input>
                            </div>
                        </div>
                        
                        <button className="button">Search</button>
                        </div>
                        </form>
                </div>
                </div>
    </>
  )
}

