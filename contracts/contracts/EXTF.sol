// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

contract EXTF is ERC721 {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private _tokenIds;

    mapping (uint256 => uint256) private _createDate;
    mapping (uint256 => uint256) private _dueDates;
    mapping (uint256 => string) private _tokenURIs;
    mapping (uint256 => string) private _descs;
     mapping(uint256 => address[]) private _recipients; // List of addresses that can access the token

    constructor() ERC721("EXTF","ETF"){
    }

    event NewTimeCapsule(uint256 id, address client, uint256 date);
    event DueDateReset(uint256 id, address client, uint256 date);
    event AddRecipient(uint256 id, address recipient);

    modifier onlyRecipient(uint256 tokenId) {
        require(isRecipient(tokenId, _msgSender()), "EXTF: Not an authorized recipient");
        _;
    }

    function dueDate(uint256 tokenId) public view returns (uint256) { return _dueDates[tokenId]; }

    function creationDate(uint256 tokenId) public view returns (uint256) { return _createDate[tokenId]; }

    function registerTimeCapsule(uint256 due_Date, string memory uri, string memory desc, address[] memory recipients) public returns (uint256){
        _tokenIds.increment();
        uint256 newId = _tokenIds.current();
        _mint(_msgSender(), newId);
        _setTokenURI(newId, uri);
        _setDueDate(newId, due_Date);
        _setCreationDate(newId, block.timestamp);
        _setDescription(newId, desc);
        _addRecipients(newId, recipients);

        emit NewTimeCapsule(newId, _msgSender(), due_Date);

        return newId;
    }

    function addRecipient(uint256 tokenId, address recipient) public {
        require(ownerOf(tokenId) == _msgSender(), "EXTF: Request is not made by the capsule owner");
        _addRecipient(tokenId, recipient);
        
        emit AddRecipient(tokenId, recipient);
    }

    function isRecipient(uint256 tokenId, address recipient) public view returns (bool) {
        for (uint256 i = 0; i < _recipients[tokenId].length; i++) {
            if (_recipients[tokenId][i] == recipient) {
                return true;
            }
        }
        return false;
    }


    // A penalty fee for changing the due date.
    // Penalty is 1e11 wei per second; around .01 ether per day
    function resetDueDate(uint256 tokenId, uint256 newDueDate, uint256 fee) public payable returns (bool) {
        require(ownerOf(tokenId)==_msgSender(), "EXTF: Request is not made by the capsule owner");
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        require(_dueDateExists(tokenId), "EXTF: Due Date not set");
        require(fee>=msg.value, "EXTF: Given fee input is less than payment");
        require(fee>=calculateResetFee(tokenId,newDueDate), "EXTF: Fee is less than what is should be");

        // Set due date to 0 temporarily, then set it to the new date to avoid reverts
        _setDueDate(tokenId, 0);
        _setDueDate(tokenId, newDueDate);

        emit DueDateReset(tokenId, _msgSender(), newDueDate);

        return true;
    }

    function calculateResetFee(uint256 id, uint256 newDueDate) public view returns (uint256) {
        uint256 fee;
        uint256 oldDueDate = dueDate(id);

        (bool isAfterNow, ) = newDueDate.trySub(block.timestamp);
        // newDueDate is after Now
        if(isAfterNow){
            (, uint256 newDiff) = oldDueDate.trySub(newDueDate);
            (, fee) = newDiff.tryMul(1e11); // .01 ether per day
        } else{ // newDueDate is before Now
            (, uint256 nowDiff) = oldDueDate.trySub(block.timestamp);
            (, fee) = nowDiff.tryMul(1e11); // .01 ether per day
        }

        return fee;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_msgSender()==ownerOf(tokenId), "EXTF: URI being accessed by non-owner");
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        require(_dueDateExists(tokenId), "EXTF: Due Date not set");
        require(dueDate(tokenId)<=block.timestamp, "EXTF: Due date not yet past");

        //return _tokenURIs[tokenId];
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.

        return string(abi.encodePacked(base, tokenId));
    }

    function viewTitle(uint256 tokenId) public view returns (string memory) {
        require(_msgSender()==ownerOf(tokenId), "EXTF: URI being accessed by non-owner");
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return _descs[tokenId];
    }

    function _setDueDate(uint256 tokenId, uint256 due_Date) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _dueDates[tokenId] = due_Date;
    }

    function _setCreationDate(uint256 tokenId, uint256 creation_Date) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _createDate[tokenId] = creation_Date;
    }

    function _dueDateExists(uint256 tokenId) internal view returns (bool) {
        return (_dueDates[tokenId]!=0);
    }
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal override {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _setDescription(uint256 tokenId, string memory _desc) internal{
        require(_exists(tokenId),"ERC721Metadata: URI set of nonexistent token");
        _descs[tokenId] = _desc;
    }

    function _addRecipient(uint256 tokenId, address recipient) internal {
        _recipients[tokenId].push(recipient);
    }
    
    function _addRecipients(uint256 tokenId, address[] memory recipients) internal {
        for (uint256 i = 0; i < recipients.length; i++) {
            _addRecipient(tokenId, recipients[i]);
        }
    }
}